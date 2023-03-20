const Persons = (props) => {
    return (
    <div>
        {props.persons.map((person) => 
            <p key = {person.id}> 
                {person.name} {person.number} <button onClick={props.handleClickDeletePerson} id = {person.id} name={person.name}>delete</button>
            </p>)}
    </div>
    )
}

export default Persons