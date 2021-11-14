import "./Card.css";

const formatDateCustom = (arg) => {
    const date = new Date(arg)
    const day = date.getDate().toString()
    const dayF = (day.length === 1) ? '0' + day : day
    const month = (date.getMonth() + 1).toString()
    const monthF = (month.length === 1) ? '0' + month : month
    const yearF = date.getFullYear();

    return dayF + "/" + monthF + "/" + yearF;
}

const stateColor = {
    pending: "",
    scheduled: "",
    fulfilled: "",
    unfulfilled: "",
    cancelled: ""
}
// person, date, hour, type, state
const Card = (props) => {
    const color = !props.state ? 'default' : props.state

    return (
        <div class={`card card-default ${color}`} >
            <div class="card-body">
                <h5 class="card-text">{formatDateCustom(props.date) + ' ' + props.hour}</h5>
                <p class="card-title">{props.type}</p>
                <a href={"/scheduling/" + props.person} class="btn btn-primary">Ver Mais</a>
            </div>
        </div>
    )
}
export default Card;