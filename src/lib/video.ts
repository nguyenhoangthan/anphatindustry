/** Chuyển link video thành dạng nhúng. Hỗ trợ YouTube (watch / youtu.be / shorts / embed)
 *  và file video tự host (.mp4/.webm...). */
export function parseVideo(url: string): { type: 'youtube' | 'file' | 'unknown'; src: string } {
  if (!url) return { type: 'unknown', src: '' }
  const u = url.trim()

  // YouTube
  const yt =
    u.match(/[?&]v=([\w-]{11})/) ||
    u.match(/youtu\.be\/([\w-]{11})/) ||
    u.match(/youtube\.com\/(?:embed|shorts)\/([\w-]{11})/)
  if (yt) return { type: 'youtube', src: `https://www.youtube.com/embed/${yt[1]}` }

  // File video tự host hoặc link trực tiếp
  if (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(u) || u.startsWith('/uploads/')) {
    return { type: 'file', src: u }
  }

  return { type: 'unknown', src: u }
}
