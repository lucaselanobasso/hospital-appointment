const geraCPF = ()=>{
    const random = n => Math.floor(Math.random() * n)
  const calcDV = nums => {
    const soma = nums.reduce(
      (acc, num, idx) => acc + num * (nums.length + 1 - idx),
      0
    )
    const resto = soma % 11
    return resto < 2 ? 0 : 11 - resto
  }

  const nums = Array.from({ length: 9 }, () => random(10))
  nums.push(calcDV(nums))
  nums.push(calcDV(nums))

  return nums.join("")
}

module.exports = { geraCPF }
