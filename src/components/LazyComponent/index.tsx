import React, { useState, useRef, useEffect, useCallback } from 'react'

interface LazyComponentProps {
  children: React.ReactNode
  className?: string
  id?: string
}

const LazyComponent: React.FC<LazyComponentProps> = ({ children, className = '', id }) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    const [entry] = entries
    if (entry.isIntersecting) {
      setIsVisible(true)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(handleIntersect, { threshold: 0.1 })
    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [handleIntersect])

  return (
    <div ref={ref} className={className} id={id}>
      {isVisible && children}
    </div>
  )
}

export default LazyComponent
