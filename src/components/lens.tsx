"use client"

import { useEffect, useRef } from "react"

// A soft magnifying bulge that follows the mouse, made from the page's own
// elements: every [data-lens] element (a word, a button, the photo) moves
// away from the cursor and grows by how close it is, along the same smooth
// falloff a glass lens would have. Only transforms, so it works in every
// browser and text stays crisp.

const RADIUS = 240 // px; nothing beyond this distance moves
const MAGNIFY = 0.1 // the element right under the cursor grows by 10%
// Push and growth fall off as (1 − r)³ and (1 − r)⁴ of the distance r. The
// push peaks a quarter of the way out and then eases back over the rest, so
// neighbouring words drift together by at most 2.5% of their spacing and
// never close the gap between them.
const FOLLOW = 10 // how quickly the lens catches up with the cursor, per second
const FADE = 7 // how quickly it appears and disappears, per second

type Unit = { el: HTMLElement; x: number; y: number; last: string }

export function Lens({ children }: { children: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = wrap.current?.firstElementChild as HTMLElement | null
    if (!root) return
    const wanted = matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)"
    )
    if (!wanted.matches) return

    let units: Unit[] = []
    // Centres relative to the root, measured without any lens transform.
    const measure = () => {
      const base = root.getBoundingClientRect()
      units = Array.from(root.querySelectorAll<HTMLElement>("[data-lens]")).map(
        (el) => {
          el.style.transform = ""
          const r = el.getBoundingClientRect()
          return {
            el,
            x: r.left + r.width / 2 - base.left,
            y: r.top + r.height / 2 - base.top,
            last: "",
          }
        }
      )
    }
    let measured = false

    const target = { x: 0, y: 0 }
    const pos = { x: 0, y: 0 }
    let placed = false
    let want = 0
    let strength = 0
    let last = 0
    let frame = 0

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60
      last = now
      const follow = 1 - Math.exp(-dt * FOLLOW)
      pos.x += (target.x - pos.x) * follow
      pos.y += (target.y - pos.y) * follow
      strength += (want - strength) * (1 - Math.exp(-dt * FADE))
      if (want === 0 && strength < 0.001) strength = 0

      const base = root.getBoundingClientRect()
      const cx = pos.x - base.left
      const cy = pos.y - base.top
      for (const u of units) {
        const dx = u.x - cx
        const dy = u.y - cy
        const r2 = (dx * dx + dy * dy) / (RADIUS * RADIUS)
        let transform = ""
        if (r2 < 1 && strength > 0) {
          const k = 1 - Math.sqrt(r2)
          const push = k ** 3 * strength * MAGNIFY
          const grow = k ** 4 * strength * MAGNIFY
          transform = `translate(${(dx * push).toFixed(2)}px, ${(dy * push).toFixed(2)}px) scale(${(1 + grow).toFixed(4)})`
        }
        if (transform !== u.last) {
          u.el.style.transform = transform
          u.last = transform
        }
      }

      const moving =
        Math.abs(target.x - pos.x) > 0.05 || Math.abs(target.y - pos.y) > 0.05
      if (moving || strength !== want) {
        frame = requestAnimationFrame(tick)
      } else {
        frame = 0
        last = 0
      }
    }
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      if (!measured) {
        measure()
        measured = true
      }
      target.x = e.clientX
      target.y = e.clientY
      if (!placed) {
        pos.x = target.x
        pos.y = target.y
        placed = true
      }
      want = 1
      wake()
    }
    const onLeave = () => {
      want = 0
      wake()
    }
    const onResize = () => {
      if (measured) measure()
      wake()
    }

    const resize = new ResizeObserver(onResize)
    resize.observe(root)
    window.addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    window.addEventListener("blur", onLeave)
    window.addEventListener("scroll", wake, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      window.removeEventListener("blur", onLeave)
      window.removeEventListener("scroll", wake)
      for (const u of units) u.el.style.transform = ""
    }
  }, [])

  return <div ref={wrap}>{children}</div>
}
