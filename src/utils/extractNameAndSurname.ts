const extractNameAndSurname = (fullName: string) => {
  const nameList = (fullName).split(' ')

  const name = nameList[0];
  const lastname = nameList[nameList.length-1];
  
  return { name, lastname }
}

export default extractNameAndSurname;