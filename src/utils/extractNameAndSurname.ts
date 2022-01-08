const extractNameAndSurname = (fullName: string) => {
  const nameList = (fullName).split(' ')

  const name = nameList[0];
  let lastname = nameList[nameList.length-1];
  
  if (name === lastname) {
    lastname = '';
    return {name, lastname };
  }
  return { name, lastname }
}

export default extractNameAndSurname;