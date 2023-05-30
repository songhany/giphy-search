import Link from 'next/link'

export default function Footer () {
  return(
    <>
      <div className="footer">
        <p><Link href="/">home</Link></p>
        <p><Link href="/about">about</Link></p>
        <p>@<a href="https://www.linkedin.com/in/songhanyu/">Songhan Yu</a> </p>
        <p>A big thanks to <a href="https://giphy.com/">giphy.com</a> for letting me use there API!</p>
      </div>
    </>
  )
}