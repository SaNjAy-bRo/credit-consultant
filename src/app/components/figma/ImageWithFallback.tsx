import React, { useState } from 'react'

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, ...rest } = props

  return didError ? (
    <span
      className="inline-flex items-center justify-center font-bold text-xs text-slate-800 bg-slate-100 px-2 py-1 rounded border border-slate-200 whitespace-nowrap"
      style={style}
    >
      {alt || 'Bank'}
    </span>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}
