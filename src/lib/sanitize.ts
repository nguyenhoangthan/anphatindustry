import sanitizeHtml from 'sanitize-html'

// Nội dung bài viết là HTML admin gõ tay, hiển thị công khai cho mọi khách
// truy cập — phải lọc trước khi render để tránh XSS (script/onerror/...).
// Chỉ cho phép các thẻ định dạng văn bản cơ bản dùng cho blog.
export function sanitizeContent(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      'h2', 'h3', 'h4', 'p', 'br', 'strong', 'b', 'em', 'i', 'u',
      'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre',
      'table', 'thead', 'tbody', 'tr', 'th', 'td', 'figure', 'figcaption',
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt', 'width', 'height'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }, true),
    },
  })
}
