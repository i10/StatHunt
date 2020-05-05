const incrFactors = async () => {
    temp.curr_fact = Number(temp.curr_fact) + 1
    console.log(temp.curr_fact == Number(temp.factors)+1);
    console.log(temp.curr_fact + ", " + temp.factors);
  }
  
  return incrFactors()
  