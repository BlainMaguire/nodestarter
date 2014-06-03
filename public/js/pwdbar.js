var input = document.getElementById('password'),
    bar1 = document.getElementById('strengthbar1'),
    bar2 = document.getElementById('strengthbar2'),
    bar3 = document.getElementById('strengthbar3'),
    bar4 = document.getElementById('strengthbar4');
input.addEventListener('keyup', function(){
var analysis = zxcvbn(input.value),
    score = analysis.score,
    color = '#BBB';
    
    bar1.style.backgroundColor = color;
    bar2.style.backgroundColor = color;
    bar3.style.backgroundColor = color;
    bar4.style.backgroundColor = color;
    
    if (input.value.length==0) {
        return;
    }
    switch(score) {
        case 0:
            color = '#880000';
            bar4.style.backgroundColor = color;
            break;
        case 1:
            color = '#885500';
            bar4.style.backgroundColor = color;
            bar3.style.backgroundColor = color;
            break;
        case 2:
            color = '#7d8800';
            bar4.style.backgroundColor = color;
            bar3.style.backgroundColor = color;
            bar2.style.backgroundColor = color;
            break;
        case 3:
        case 4:
            color = '#048800';
            bar4.style.backgroundColor = color;
            bar3.style.backgroundColor = color;
            bar2.style.backgroundColor = color;
            bar1.style.backgroundColor = color;
            break;
    }
});
