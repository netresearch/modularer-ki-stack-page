// The lens samples one displaced image. At its rounded-square boundary the
// displacement is exactly zero, so text never doubles through cross-fading.
const CORE = 0.7
const ZOOM = 2.5
const clamp = (value, low, high) => Math.max(low, Math.min(value, high))
const smooth = (low, high, value) => {
  const t = clamp((value - low) / (high - low), 0, 1)
  return t * t * (3 - 2 * t)
}

const vertexSource = `
attribute vec2 a_position;
varying vec2 v_point;
void main() {
  v_point = vec2((a_position.x + 1.0) * 0.5, (1.0 - a_position.y) * 0.5);
  gl_Position = vec4(a_position, 0.0, 1.0);
}`
const fragmentSource = `
precision highp float;
uniform sampler2D u_texture;
uniform vec4 u_view;
uniform vec4 u_image;
uniform vec4 u_clip;
uniform vec2 u_focus;
uniform vec2 u_textureScale;
varying vec2 v_point;
void main() {
  vec2 q = abs(v_point * 2.0 - 1.0);
  float distance = pow(pow(q.x, 8.0) + pow(q.y, 8.0), 0.125);
  if (distance >= 1.0) { gl_FragColor = vec4(0.0); return; }
  vec2 screen = u_view.xy + v_point * u_view.zw;
  // The glass deforms only the existing screenshot, never headings or captions.
  if (screen.x < max(u_image.x, u_clip.x) || screen.x > min(u_image.x + u_image.z, u_clip.z)
    || screen.y < max(u_image.y, u_clip.y) || screen.y > min(u_image.y + u_image.w, u_clip.w)) {
    gl_FragColor = vec4(0.0); return;
  }
  vec2 center = u_view.xy + u_view.zw * 0.5;
  float blend = smoothstep(0.7, 1.0, distance);
  vec2 source = mix(u_focus + (screen - center) / 2.5, screen, blend);
  vec2 uv = (source - u_image.xy) / u_image.zw;
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0
    || source.x < u_clip.x || source.x > u_clip.z
    || source.y < u_clip.y || source.y > u_clip.w) {
    gl_FragColor = vec4(0.0); return;
  }
  vec4 color = texture2D(u_texture, uv * u_textureScale);
  // A faint reflection follows only the curved rim; the reading area stays exact.
  float rim = smoothstep(0.72, 0.92, distance) * (1.0 - smoothstep(0.92, 1.0, distance));
  float light = 0.022 * rim * clamp((0.5 - v_point.y) * 1.4 + (0.5 - v_point.x) * 0.6, 0.0, 1.0);
  gl_FragColor = vec4(color.rgb + (1.0 - color.rgb) * light, color.a);
}`

function webglRenderer(canvas, gl, onContextLost) {
  const shaders = []
  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
  let program, buffer, texture, sourceImage, sourceUrl
  const destroy = () => {
    if (texture) gl.deleteTexture(texture)
    if (buffer) gl.deleteBuffer(buffer)
    if (program) gl.deleteProgram(program)
    for (const shader of shaders) gl.deleteShader(shader)
  }
  function shader(type, source) {
    const item = gl.createShader(type)
    shaders.push(item)
    gl.shaderSource(item, source)
    gl.compileShader(item)
    if (!gl.getShaderParameter(item, gl.COMPILE_STATUS)) throw new Error('Lens shader unavailable')
    return item
  }
  try {
    program = gl.createProgram()
    gl.attachShader(program, shader(gl.VERTEX_SHADER, vertexSource))
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fragmentSource))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Lens shader link failed')
    gl.useProgram(program)
    buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
    texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    // DOM image uploads use their natural top-to-bottom order, matching v_point.
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
    const locations = Object.fromEntries(['u_view', 'u_image', 'u_clip', 'u_focus', 'u_textureScale'].map(name => [name, gl.getUniformLocation(program, name)]))
    const lost = event => { event.preventDefault(); onContextLost() }
    canvas.addEventListener('webglcontextlost', lost)
    return {
      type: 'webgl',
      draw(image, state) {
        const { size, left, top, box, pointerX, pointerY } = state
        const pixels = Math.round(size * Math.min(devicePixelRatio || 1, 2))
        if (canvas.width !== pixels || canvas.height !== pixels) canvas.width = canvas.height = pixels
        gl.viewport(0, 0, pixels, pixels)
        if (sourceImage !== image || sourceUrl !== (image.currentSrc || image.src)) {
          // WebGL1 needs power-of-two textures for mipmaps. Preserve original
          // pixels; pad with edge pixels instead of resizing the reading area.
          const width = 2 ** Math.ceil(Math.log2(image.naturalWidth))
          const height = 2 ** Math.ceil(Math.log2(image.naturalHeight))
          if (width > maxTextureSize || height > maxTextureSize) throw new Error('Lens texture exceeds GPU limit')
          const padded = document.createElement('canvas')
          padded.width = width; padded.height = height
          const painter = padded.getContext('2d')
          const iw = image.naturalWidth, ih = image.naturalHeight
          painter.drawImage(image, 0, 0)
          if (width > iw) painter.drawImage(image, iw - 1, 0, 1, ih, iw, 0, width - iw, ih)
          if (height > ih) painter.drawImage(image, 0, ih - 1, iw, 1, 0, ih, iw, height - ih)
          if (width > iw && height > ih) painter.drawImage(image, iw - 1, ih - 1, 1, 1, iw, ih, width - iw, height - ih)
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, padded)
          gl.generateMipmap(gl.TEXTURE_2D)
          gl.uniform2f(locations.u_textureScale, iw / width, ih / height)
          padded.width = padded.height = 0
          sourceImage = image
          sourceUrl = image.currentSrc || image.src
        }
        gl.uniform4f(locations.u_view, left, top, size, size)
        gl.uniform4f(locations.u_image, box.left, box.top, box.width, box.height)
        gl.uniform4f(locations.u_clip, box.clip.left, box.clip.top, box.clip.right, box.clip.bottom)
        gl.uniform2f(locations.u_focus, pointerX, pointerY)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      },
      dispose() { canvas.removeEventListener('webglcontextlost', lost); destroy(); sourceImage = sourceUrl = undefined },
    }
  } catch (error) { destroy(); throw error }
}

function canvasRenderer(canvas) {
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Lens canvas unavailable')
  // Retain only the active source. Read its pixels once, not on pointer moves.
  let sourceImage, sourceUrl, source, sourceWidth, sourceHeight, output
  return {
    type: 'canvas2d',
    draw(image, state) {
      const { size, left, top, box, pointerX, pointerY } = state
      // Limit the CPU path to a quarter-megapixel per coalesced animation frame.
      const pixels = Math.min(512, Math.round(size))
      if (canvas.width !== pixels || canvas.height !== pixels) {
        canvas.width = canvas.height = pixels
        output = context.createImageData(pixels, pixels)
      }
      if (sourceImage !== image || sourceUrl !== (image.currentSrc || image.src)) {
        const scratch = document.createElement('canvas')
        scratch.width = image.naturalWidth
        scratch.height = image.naturalHeight
        const reader = scratch.getContext('2d', { willReadFrequently: true })
        reader.drawImage(image, 0, 0)
        source = reader.getImageData(0, 0, scratch.width, scratch.height).data
        sourceWidth = scratch.width; sourceHeight = scratch.height; sourceImage = image
        sourceUrl = image.currentSrc || image.src
        scratch.width = scratch.height = 0
      }
      if (!output) output = context.createImageData(pixels, pixels)
      const data = output.data
      const centerX = left + size / 2, centerY = top + size / 2
      const step = size / pixels
      const xPowers = new Float64Array(pixels)
      for (let x = 0; x < pixels; x++) xPowers[x] = Math.abs((x + 0.5) / pixels * 2 - 1) ** 8
      for (let y = 0; y < pixels; y++) {
        const py = top + (y + 0.5) * step
        const yPower = Math.abs((y + 0.5) / pixels * 2 - 1) ** 8
        for (let x = 0; x < pixels; x++) {
          const index = (y * pixels + x) * 4
          const distance = (xPowers[x] + yPower) ** 0.125
          if (distance >= 1) { data[index + 3] = 0; continue }
          const px = left + (x + 0.5) * step
          if (px < Math.max(box.left, box.clip.left) || px > Math.min(box.left + box.width, box.clip.right)
            || py < Math.max(box.top, box.clip.top) || py > Math.min(box.top + box.height, box.clip.bottom)) {
            data[index + 3] = 0; continue
          }
          const blend = smooth(CORE, 1, distance)
          const sx = (pointerX + (px - centerX) / ZOOM) * (1 - blend) + px * blend
          const sy = (pointerY + (py - centerY) / ZOOM) * (1 - blend) + py * blend
          const u = (sx - box.left) / box.width, v = (sy - box.top) / box.height
          if (u < 0 || u > 1 || v < 0 || v > 1 || sx < box.clip.left || sx > box.clip.right || sy < box.clip.top || sy > box.clip.bottom) {
            data[index + 3] = 0; continue
          }
          const fx = clamp(u * sourceWidth - 0.5, 0, sourceWidth - 1)
          const fy = clamp(v * sourceHeight - 0.5, 0, sourceHeight - 1)
          const x0 = Math.floor(fx), y0 = Math.floor(fy)
          const x1 = Math.min(x0 + 1, sourceWidth - 1), y1 = Math.min(y0 + 1, sourceHeight - 1)
          const tx = fx - x0, ty = fy - y0
          const a = (y0 * sourceWidth + x0) * 4, b = (y0 * sourceWidth + x1) * 4
          const c = (y1 * sourceWidth + x0) * 4, d = (y1 * sourceWidth + x1) * 4
          const rim = smooth(0.72, 0.92, distance) * (1 - smooth(0.92, 1, distance))
          const light = 0.022 * rim * clamp((0.5 - (y + 0.5) / pixels) * 1.4 + (0.5 - (x + 0.5) / pixels) * 0.6, 0, 1)
          for (let channel = 0; channel < 4; channel++) {
            let value = (source[a + channel] * (1 - tx) + source[b + channel] * tx) * (1 - ty)
              + (source[c + channel] * (1 - tx) + source[d + channel] * tx) * ty
            if (channel < 3) value += (255 - value) * light
            data[index + channel] = value
          }
        }
      }
      context.putImageData(output, 0, 0)
    },
    dispose() { sourceImage = sourceUrl = source = output = undefined },
  }
}

export function createLensRenderer(canvas, { forceCanvas = false, onContextLost = () => {} } = {}) {
  if (!forceCanvas) {
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: false, depth: false, stencil: false, preserveDrawingBuffer: false })
    if (gl) return webglRenderer(canvas, gl, onContextLost)
  }
  return canvasRenderer(canvas)
}
