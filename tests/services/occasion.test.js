import test from 'ava'
import occasion from '../../services/occasion'

test("new occasion constructor without arguments", t => {
  let date = new Date()
  t.is(new occasion().toString(), date.toString())
})

test("new occasion constructor with arguments", t => {
  let date = new Date()
  t.is(new occasion(date).toString(), date.toString())
})

test("occasion format without arguments", t => {
  let date = new Date()
  t.is(new occasion(date).format(), date.toString())
})

test('occasion getDate', t => {
  let date = new Date(2016, 10, 13)
  t.is(new occasion(date).getDate(), 'Sun, Nov 13th 2016')
})

test('occasion getTime', t => {
  let date = new Date(2016, 10, 13, 21, 45, 30)
  t.is(new occasion(date).getTime(), '9:45 PM')
})

test.skip("occasion format with arguments", t => {
  let date = new Date()
  t.is(new occasion(date).format('d M D Y'), date.toDateString())
})
