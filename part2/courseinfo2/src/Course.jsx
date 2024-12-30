//Course
const Course = ({courses}) => {
    
    return (
      <div>
        {
          courses.map(
            course => (
              <div key={course.id} >
                <Header course={course.name} />
                <Content parts={course.parts} />
                <Total sum={course.parts.reduce( 
                  (sum, part) =>sum + part.exercises, 0
                )}/>      
              </div>
            )
          )
        }
      </div>
      
    )
  }
  
  const Header = ({ course }) => <h1>{course}</h1>
  
  const Total = ({sum}) => <p>total of {sum} exercises</p>
  
  const Part = ({ par }) => 
    <p>
      {par.name} {par.exercises}
    </p>
  
  const Content = ({ parts }) => //parts prop is destructured directly from the component's arguments
    <>
      {parts.map(
        part => (<Part key={part.id} par={part}/>) //current obj => (proessed by Part)
      )} 
    </>

export default Course