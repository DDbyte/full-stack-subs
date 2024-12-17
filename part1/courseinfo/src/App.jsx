
// Header
const Header = (props) =>{
  
  return(
    <div>
      <h1>{props.c_title}</h1>
    </div>
  )
}

// Part
const Part = (props) =>{
  
  return(
    <p>
      {props.p}, has {props.e} exercises.
    </p>
  )
}

// Content
const Content = (props) =>{
  console.log(props) //{parts: Array(3)}, passed as a single prop, accessed using indices
  return(
    <>
      <p>The parts are:</p>      
      <Part p = {props.parts[0].p_title} e = {props.parts[0].exercises} />
      <Part p = {props.parts[1].p_title} e = {props.parts[1].exercises} />
      <Part p = {props.parts[2].p_title} e = {props.parts[2].exercises} />
    </>
  )
} 

// Total
const Total = (props) => {
  console.log(props) //{parts: Array(3)}  
      const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
      return <p>The total number of exercises is: {total}</p>
  }



// App
const App = () => {
  const course = {
    title: 'Half Stack application development',
    parts: [
      {
        p_title:'Fundamentals of React',
        exercises: 10,
      },
      
      {
        p_title: 'Using props to pass data',
        exercises: 7,
      },
      
      {
        p_title: 'State of a component',
        exercises: 14,
      },
    ]
  }
  
  

  return (
    <> 
      <Header c_title={course.title}/>      
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>          
    </>
  )
}

export default App