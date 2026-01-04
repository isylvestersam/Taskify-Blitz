import { useLayoutEffect, useState } from "react"

export function useFloatingPosition(open, triggerRef, menuRef) {
  const [style, setStyle] = useState({})
  const [openUp, setOpenUp] = useState(false)

  useLayoutEffect(() => {
    if (!open || !triggerRef.current || !menuRef.current) return

    const rect = triggerRef.current.getBoundingClientRect()
    const menu = menuRef.current

    const spaceBelow = window.innerHeight - rect.bottom
    const spaceAbove = rect.top

    const shouldOpenUp =
      spaceBelow < menu.offsetHeight && spaceAbove > spaceBelow

    const padding = 8
    const left = Math.min(
      window.innerWidth - rect.width - padding,
      Math.max(padding, rect.left)
    )

    const top = shouldOpenUp
      ? rect.top - menu.offsetHeight - 6
      : rect.bottom + 6

    // Important: match dropdown width to trigger
    const width = rect.width;

    setOpenUp(shouldOpenUp)
    setStyle({ top, left, width })
  }, [open])

  return { style, openUp }
}
