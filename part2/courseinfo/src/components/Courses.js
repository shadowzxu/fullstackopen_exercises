import React from 'react';

const Courses = (props) => {
    return (
        <div>
        <h1>Web development currisulum</h1>
        {props.courses.map((course) => <Course key = {course.id} course = {course} />)}
        </div>
    )
}

const Course = (props) => {
    return (
        <div>
        <Header course = {props.course.name} />
        <Content parts = {props.course.parts} />
        <Total parts = {props.course.parts} />
        </div>
    )
}

const Header = (props) => {
    return <h2>{props.course}</h2>
}

const Content = (props) => {
    return (
        <div>
        {props.parts.map((part) => 
        <Part key = {part.id} name = {part.name} exercises = {part.exercises}/>)}
        </div>
    )
}

const Part = (props) => {
    return (
        <p>
        {props.name} {props.exercises}
        </p>
    )
}
  
const Total = (props) => {
    const sum = props.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <b>total of {sum} exercises</b>
    )
}

export default Courses