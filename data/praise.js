export default () => {
  const praises = [
    "That's how to do it!",
    "Way to go!",
    "A fine, fine answer.",
    "Wow. You're both smart, AND good-looking!"
  ]

  return praises[Math.floor(Math.random() * praises.length)]
}
