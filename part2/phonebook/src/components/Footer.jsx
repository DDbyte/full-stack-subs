

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Phonebook App, Full-Stack Course, University of Helsinki {currentYear}</em>
    </div>
  )
}

export default Footer