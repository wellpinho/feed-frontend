import Card from "./Card";

const AllCards = (schedules) => {
    // console.log(schedules)
    return (
        <div className="container card mt-5">
            <h2 className="mt-3 text-center">Ahfeed</h2>
            <h4 className="text-center">Cerimônias inteligentes</h4>

            <div class="row row-cols-1 row-cols-md-3 mt-5">
 
                    {  !!schedules.schedules
                        ? schedules.schedules.map((schedule) => {
                            return <div class="col mb-4">
                                <Card
                                    person={schedule.user}
                                    date={schedule.date}
                                    hour={schedule.hour}
                                    state={schedule.state}
                                    type={schedule.type_schedule}
                                />
                            </div>

                        })
                        : <span>Nenhum Registro encontrado!</span>
                    }            
    
            </div>
        </div>

    )
};
export default AllCards;