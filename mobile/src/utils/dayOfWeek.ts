export default function getDayOfTheWeek(day: string){
    const days = {
        '0' : 'Domingo',
        '1' : 'Segunda',
        '2' : 'Terça',
        '3' : 'Quarta',
        '4' : 'Quinta',
        '5' : 'Sexta',
        '6' : 'Sábado',
    };
    let daysArr = Object.entries(days);
    for(let i = 0; i < daysArr.length; i++){
        if(daysArr[i][0] === day) {
          return daysArr[i][1];
        }
    }
}

