
export const getInitials = (name) =>{
  if(!name) return ""

  const words = name.split(" ");

  let initials = ""

  for(let i=0; i<Math.min(words.length,2); i++){
    initials += words[i][0].toUpperCase()
  }
  return initials
}