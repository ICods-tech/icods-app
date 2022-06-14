export const encryptEmail = (email: string) => {
  if (!email.length) {
    return '';
  }
  const splittedEmail = email.split('@');
  const [domain, ...rest] = splittedEmail[1].split('.');
  const firstHalfOfEmailLength = Math.floor(0.9 * splittedEmail[0].length - 1);
  const secondHalfOfEmailLength =
    splittedEmail[0].length - firstHalfOfEmailLength;
  const emailDomainLength = domain.length;
  splittedEmail[0] = splittedEmail[0].substr(0, firstHalfOfEmailLength);
  const encryptedEmailName = `${splittedEmail[0]}${new Array(
    secondHalfOfEmailLength,
  )
    .fill('*')
    .join('')}`;
  const encryptedDomain = new Array(emailDomainLength).fill('*').join('');

  return `${encryptedEmailName}@${encryptedDomain}.${rest.join('.')}`;
};
