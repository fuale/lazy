const eq = (a, b) => a() === b()
const ifElse = (a, b, c) => (a() ? b : c)
const pair = (head, tail) => ({ head, tail })
const head = pair => pair.head
const tail = pair => pair.tail
const length = xs => xs.length
const nth = (n, xs) => xs[n]
const slice = (n, xs) => xs.slice(n)
const not = x => !x()
const and = (a, b) => a() && b()
const gt = (a, b) => a() > b()
const dec = a => a() - 1
const inc = a => a() + 1
const blet = (a, k) => k(a())
const call = (fn, ...args) => fn(...args)
const until = (p, k, init) => {
  let val = init
  while (!p(val)) val = k(val)
  return val
}

const toList = x =>
  ifElse(
    eq(
      () => length(x),
      () => 0
    ),
    () => null,
    () => pair(() => nth(0, x), toList(slice(1, x)))
  )

const take = (n, list) => () => {
  const index = n(),
    last = list()

  return ifElse(
    () =>
      and(
        () =>
          gt(
            () => index,
            () => 0
          ),
        () =>
          not(() =>
            eq(
              () => last,
              () => null
            )
          )
      ),

    pair(
      head(last),
      take(() => dec(() => index), tail(last))
    ),
    null
  )
}

const range = from => () =>
  blet(
    () => from(),
    x =>
      pair(
        () => x,
        range(() => inc(() => x))
      )
  )

const log = a =>
  until(
    p =>
      eq(
        () => p,
        () => null
      ),
    pair => (console.log(call(head(pair))), call(tail(pair))),
    a()
  )

log(
  take(
    () => 10,
    range(() => 1)
  )
)

log(range(() => 1))
