function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function inlineMarkdown(value: string) {
  return escapeHtml(value)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
}

export function markdownToHtml(markdown: string) {
  const lines = markdown.split(/\r?\n/)
  const html: string[] = []
  let listOpen = false

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) {
      if (listOpen) {
        html.push('</ul>')
        listOpen = false
      }
      continue
    }

    if (trimmed.startsWith('## ')) {
      if (listOpen) {
        html.push('</ul>')
        listOpen = false
      }
      html.push(`<h2>${inlineMarkdown(trimmed.slice(3))}</h2>`)
      continue
    }

    if (trimmed.startsWith('- ')) {
      if (!listOpen) {
        html.push('<ul>')
        listOpen = true
      }
      html.push(`<li>${inlineMarkdown(trimmed.slice(2))}</li>`)
      continue
    }

    const numbered = trimmed.match(/^\d+\.\s+(.*)$/)
    if (numbered) {
      if (!listOpen) {
        html.push('<ul>')
        listOpen = true
      }
      html.push(`<li>${inlineMarkdown(numbered[1])}</li>`)
      continue
    }

    if (listOpen) {
      html.push('</ul>')
      listOpen = false
    }
    html.push(`<p>${inlineMarkdown(trimmed)}</p>`)
  }

  if (listOpen) html.push('</ul>')
  return html.join('\n')
}

export function contentToHtml(content: string) {
  const html = /<\/?[a-z][\s\S]*>/i.test(content) ? content : markdownToHtml(content)
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '')
    .replace(/href=(["'])javascript:[\s\S]*?\1/gi, 'href="#"')
}
