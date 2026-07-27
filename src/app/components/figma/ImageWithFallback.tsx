import React, { useState } from 'react'

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export function ImageWithFallback({ fallbackSrc, src, alt, style, className, ...rest }: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  if (didError && fallbackSrc) {
    return <img src={fallbackSrc} alt={alt} className={className} style={style} {...rest} />
  }

  return didError ? (
    <span
      className="inline-flex items-center justify-center font-bold text-xs text-slate-800 bg-slate-100 px-2.5 py-1 rounded border border-slate-200 whitespace-nowrap"
      style={style}
    >
      {alt || 'Bank'}
    </span>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}
