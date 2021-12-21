const extractNameAndSurname = (fullName: string) => {
  const nameFormatted = fullName.replace(' de ', ' ');
  const nameFormattedByde = nameFormatted.replace(' da ', ' ');
  const nameFormattedBydeda = nameFormattedByde.replace(' do ', ' ');

  // const nameFormatted = fullName.replace(/|[\b]de[\b]|[\b]da[\b]|([\b]do[\b])/g, ' ')
  // console.log(nameFormattedBydeda);
  const [name, surname] = (nameFormattedBydeda).split(' ')
  return { name, surname }
}

export default extractNameAndSurname;