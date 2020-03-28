export let steps = [
    {
        id: '1',
        message: `Welcome to StatHunt :)!`,
        trigger: 'eg'
    },
    {
        id: 'eg',
        message: 'To get started, choose one of the options below! If you want to start linear walkthrough, click start!',
        trigger: 'eg:'
    },
    {
        id: 'eg:',
        options: general_options()
    },
    {
        id: 'elw',
        message: `Awesome, let's get this ball rolling! If you want to jump back to the main overview you can press "back" at any time, if you're unsure or need help press "help"`,
        trigger: 'ega'
    },
    {
        id: 'ega',
        message: `What is the goal of your experiment analysis?`,
        trigger: 'text<'
    },
    {
        id: 'ega',
        message: `What is the goal of your experiment analysis?`,
        trigger: 'text<'
    },
    {
        id: 'ehy',
        message: `What is the goal of your experiment analysis?`,
        trigger: 'text<'
    },
    {
        id: 'eed',
        message: `What is the goal of your experiment analysis?`,
        trigger: 'text<'
    },
    {
        id: 'epr',
        message: `What is the goal of your experiment analysis?`,
        trigger: 'text<'
    },
    {
        id: 'ess',
        message: `What is the goal of your experiment analysis?`,
        trigger: 'text<'
    },
    {
        id: 'eiv',
        message: `What is the goal of your experiment analysis?`,
        trigger: 'text<'
    },
    {
        id: 'edv',
        message: `What is the goal of your experiment analysis?`,
        trigger: 'text<'
    },
    {
        id: 'eh',
        message: `What is the goal of your experiment analysis?`,
        trigger:  'text<'
    },
    {  
        id: 'text<',
        user: true,
        trigger: ({value, steps}) => {console.log(value); console.log(steps); next_step()}
    },

]

var i = 0

function next_step(){
    var inf = ['ega','ehy','eed','epr','ess','edv','eiv'];
    i++;
    console.log(inf[i-1])
    return inf[i-1];
}
function general_options(){
    var opt_list = [
        ["Start", 'elw'],
        ["Goal of Analysis", 'ega'],
        ["Hypothesis", 'ehy'],
        ["Experimental Design", 'eed'],
        ["Procedure", 'epr'],
        ["Sample Size", 'ess'],
        ["Dependent Variables", 'edv'],
        ["Independent Variables", 'eiv'],
        ["Help", 'eh']
    ]
    var out = []
    for(var i = 0; i < opt_list.length; i++){
        out.push({
            value: String(i),
            label: opt_list[i][0],
            trigger: opt_list[i][1]
        })
    }
    return out
}