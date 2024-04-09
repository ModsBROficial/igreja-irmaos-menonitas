export default function formatFirstWordToUpperCase(name: string) {
  if (!name) {
    return null;
  }
  let formattedName = name[0].toUpperCase();
  let joinName = formattedName + name.substring(1); 
  return joinName
}