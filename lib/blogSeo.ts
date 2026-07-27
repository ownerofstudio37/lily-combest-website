export interface BlogFaqItem {
  question: string
  answer: string
}

export function extractBlogFaqs(content: string): BlogFaqItem[] {
  const faqs: BlogFaqItem[] = []
  const lines = content.split(/\r?\n/)

  for (let index = 0; index < lines.length; index += 1) {
    const questionMatch = lines[index].trim().match(/^\*\*(.+\?)\*\*\s*$/)
    if (!questionMatch) continue

    const answerLines: string[] = []
    for (let next = index + 1; next < lines.length; next += 1) {
      const trimmed = lines[next].trim()
      if (!trimmed) continue
      if (trimmed.startsWith('## ') || /^\*\*.+\?\*\*/.test(trimmed)) break
      answerLines.push(trimmed)
    }

    if (answerLines.length) {
      faqs.push({
        question: questionMatch[1],
        answer: answerLines.join(' '),
      })
    }
  }

  return faqs
}
