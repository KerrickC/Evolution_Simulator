let species2_array = [];
let species1_array = [];
let vegitation_array = [];


function setup() {

    createCanvas(750, 750);

    let initial_species1 = 5;
    let initial_species2 = 5;
    let initial_vegitation = 50;

    //create initial species2s and species1
    for(let i = 0; i < initial_species1; i ++){
        addSpecies1();
    }

    for(let i = 0; i < initial_species2; i ++){
        addSpecies2();
    }

    for(let i = 0; i < initial_vegitation; i ++){
        addVegitation();
    }

    let add_species1 = createButton('Add species1');
    add_species1.position(0,height + 50)
    add_species1.mousePressed(()=>{addSpecies1(species1_array)})

    let add_species2 = createButton('Add species2');
    add_species2.position(100, height+50);
    add_species2.mousePressed(addSpecies2);

    let body = document.body;
    body.style.display = 'flex';

    let main = document.createElement('div');
    main.style.display = 'inline-block';

    let species1_info = document.createElement('div');
        let species1_remaining = document.createElement('p');
        species1_remaining.id = 'species1';
        species1_remaining.innerHTML = `species1 remaining: ${species1_array.length}`;
        species1_info.append(species1_remaining);

    let species2_info = document.createElement('div');
        let species2_remaining = document.createElement('p');
        species2_remaining.id = 'species2'
        species2_remaining.innerHTML = `species2s remaining: ${species2_array.length}`;
        species2_info.append(species2_remaining);

    let vegitation_info = document.createElement('div');
        let vegitation_remaining = document.createElement('p');
        vegitation_remaining.id = 'veg';
        vegitation_remaining.innerHTML = `Vegitation remaining: ${vegitation_array.length}`;
        vegitation_info.append(vegitation_remaining);

    let s1_most_prev_mut = document.createElement('div');
        let s1_mut = document.createElement('p');
        s1_mut.id = 'sp1_mut';
        s1_mut.innerHTML = `Most common Species 1 mutation: ${getMutations(species1_array)}`;
        s1_most_prev_mut.append(s1_mut);

    let s2_most_prev_mut = document.createElement('div');
        let s2_mut = document.createElement('p');
        s2_mut.id = 'sp2_mut';
        s2_mut.innerHTML = `Most common Species 2 mutation: ${getMutations(species2_array)}`;
        s2_most_prev_mut.append(s2_mut);



    main.append(species1_info);
    main.append(species2_info);
    main.append(vegitation_info);
    main.append(s1_most_prev_mut);
    main.append(s2_most_prev_mut);

    body.append(main);


  }
  
  function draw() {

    background(144,238,144);

    document.getElementById('veg').innerHTML = `Vegitation remaining: ${vegitation_array.length}`;
    document.getElementById('species1').innerHTML = `Species 1 (blue) remaining: ${species1_array.length}`;
    document.getElementById('sp1_mut').innerHTML = `Species 1 (blue) mutations: ${getMutations(species1_array)}`
    document.getElementById('species2').innerHTML = `Species 2 (red) remaining: ${species2_array.length}`;
    document.getElementById('sp2_mut').innerHTML = `Species 2 (red) mutations: ${getMutations(species2_array)}`

     

    for(let i = 0; i < species2_array.length; i++){
        species2_array[i].move();
        species2_array[i].display();
        species2_array[i].mate(species2_array);
        vegitation_array = species2_array[i].eat(vegitation_array);
        species1_array = species2_array[i].predate(species1_array);


    }

    for(let i = 0; i < species1_array.length; i++){
        species1_array[i].move();
        species1_array[i].display();
        species1_array[i].mate(species1_array);
        vegitation_array =  species1_array[i].eat(vegitation_array);
        species2_array = species1_array[i].predate(species2_array);

    }

    for(let i = 0; i < vegitation_array.length; i++){
        vegitation_array[i].display();
    }

    if(vegitation_array.length < 10){
        respawnVegitation();
    }
    if(species1_array.length === 0){
        alert('Species 2 wins!');
    }
    if(species2_array.length === 0){
        alert('Speices 1 wins!');
    }
    
  }

  function respawnVegitation(){
    let num = 30;
    for(let i = 0; i < num; i++){
        vegitation_array.push(new Vegitation());
    }
  }

  function addSpecies1(parent1, parent2){
    let p = new Species1(parent1, parent2);
    species1_array.push(p);
  }

  function addSpecies2(parent1, parent2){
    let p = new Species2(parent1, parent2);
    species2_array.push(p);
  }

  function addVegitation(){
    let v = new Vegitation();
    vegitation_array.push(v);
  }

  

  function getMutations(arr){
      let mutations  = {
        'increaseOffspring' : 0,
        'decreaseOffspring' : 0,
        'increaseRadius' : 0,
        'decreaseRadius' : 0,
        'increaseSpeed' : 0, 
        'decreaseSpeed' : 0,
        'isPredator' : 0
    };

    for(let i = 0; i < arr.length; i++){

        let cur_muts = arr[i].mutationPasser;

        for(let mut in cur_muts){
            if(cur_muts[mut] === 1 || cur_muts[mut] === 2){
                mutations[mut] ++;
            }
        }

    }

    let mutation_string = `</br>`;
    for(let mut in mutations){
        mutation_string += `${mut}: ${mutations[mut]} </br>`
    }
    //var curMost = -1;

    return mutation_string;
  }

//   function mousePressed(){
//       for(let i = 0; i < species1_array.length; i ++){
//           let d = dist(mouseX, mouseY, species1_array[i].x, species1_array[i].y);
//           if(d < 20){
//               alert(JSON.stringify(species1_array[i].info));
//           }
//       }

//       for(let i = 0; i < species2_array.length; i ++){
//         let d = dist(mouseX, mouseY, species2_array[i].x, species2_array[i].y);
//         if(d < 20){
//             alert(JSON.stringify(species2_array[i].info));
//         }
//     }
//   }


  class Species{
      constructor(parent1, parent2){
        this.x = random(width);
        this.y = random(height);

        this.parent1 = parent1;
        this.parent2 = parent2;


        this.radius = 8;

        this.xp = 50;
        //decrease when touched by species2
        //increase when hunger is full

        this.speed = 5;
        //how fast can move around environment

        this.mates_remaining = 10;

        this.numOffspring = 3;

        this.mutant = false;

        this.isPredator = false;

        

      }

      //prototype methods
      

    move() {
        this.x += random(-this.speed, this.speed);
        this.y += random(-this.speed, this.speed);

        if(this.x > width - this.radius || this.x < this.radius){
            this.x = random(width);
            this.y = random(height);
        }
        if(this.y > height - this.radius || this.y < this.radius){
            this.x = random(width);
            this.y = random(height);
        }
    }

    eat(vegitation_array){
        for(let i = 0; i < vegitation_array.length; i ++){
            let target_x = vegitation_array[i].x;
            let target_y = vegitation_array[i].y;        

            //check collision
            let distance = dist(this.x, this.y, target_x, target_y);

            if(distance < 10 && distance > 0 && this.xp <= 90){
                console.log("Vegitation eaten.");
                this.xp += 10;
                vegitation_array.splice(i, 1);
                return vegitation_array;
            }
        }
        return vegitation_array;
    }

    predate(species_array){
        if(this.isPredator){
            for(let i = 0; i < species_array.length; i ++){
                let target_x = species_array[i].x;
                let target_y = species_array[i].y;        
    
                //check collision
                let distance = dist(this.x, this.y, target_x, target_y);
    
                if(distance < 10 && distance > 0 && this.xp <= 80){
                    this.xp += 20;
                    species_array.splice(i, 1);
                    return species_array;
                }
    
            }
            return species_array;
        }else{
            return species_array;
        }
        
    }

    mutate(){
        var parent_genetics = {
            'increaseOffspring' : 0,
            'decreaseOffspring' : 0,
            'increaseRadius' : 0,
            'decreaseRadius' : 0,
            'increaseSpeed' : 0, 
            'decreaseSpeed' : 0,
            'isPredator' : 0
        }

        //check parents for a mutation
        for(var mut in this.parent1){
            if(this.parent1[mut] === 1){
                parent_genetics[mut] ++;
            }
        }
        for(var mut in this.parent2){
            if(this.parent2[mut] === 1){
                parent_genetics[mut] ++;
            }
        }

        for(var mut in parent_genetics){

            let mutator_val;

            if(parent_genetics[mut] === 0){
                 mutator_val = Math.floor(Math.random() * 30);
            }else if(parent_genetics[mut] === 1){
                mutator_val = Math.floor(Math.random() * 7);
            }else if(parent_genetics[mut] === 2){
                mutator_val = Math.floor(Math.random() * 3);
            }

            if(mutator_val === 0){
               //console.log("A mutation has occurred: " + mut );
                this.mutant = true;

                switch(mut){
                    case 'isPredator':
                        let chance = Math.floor(Math.random() * 2);
                        if(chance === 0){
                            this.isPredator = true;
                            this.mutationPasser[mut] = 1;

                        }
                        break;
                    case 'increaseOffspring':
                        this.numOffspring += Math.floor(Math.random() * 5);
                        this.mutationPasser[mut] = 1;

                        break;
                    case 'decreaseOffspring':
                        this.numOffspring -= Math.floor(Math.random() * 3);
                        this.mutationPasser[mut] = 1;

                        break;
                    case 'increaseRadius':
                        this.radius += Math.floor(Math.random() * 5);
                        this.mutationPasser[mut] = 1;

                        break;
                    case 'decreaseRadius':
                        this.radius -= Math.floor(Math.random() * 5);
                        this.mutationPasser[mut] = 1;

                        break;
                    case 'increaseSpeed':
                        this.speed += Math.floor(Math.random() * 5);
                        this.mutationPasser[mut] = 1;

                        break; 
                    case 'decreaseSpeed':
                        this.speed -= Math.floor(Math.random() * 5);
                        this.mutationPasser[mut] = 1;

                        break;
                           
                       
                    
                }
            }else{
                console.log("mutation failure")
            }
            
            
        }

        }




  }



  class Species1 extends Species{

    constructor(parent1, parent2){


        super(parent1, parent2);
        

        this.mutationPasser = {
            'increaseOffspring' : 0,
            'decreaseOffspring' : 0,
            'increaseRadius' : 0,
            'decreaseRadius' : 0,
            'increaseSpeed' : 0, 
            'decreaseSpeed' : 0,
            'isPredator' : 0
        }

        this.info = {
            'Speed': this.speed,
            'XP': this.xp,
            'Mates Remaining': this.mates_remaining,
            'Number of Offspring': this.numOffspring,
            'Radius': this.radius,
            'Mutations': this.mutationPasser
        }

        this.mutate();

    }

    
    display(){
        fill(0,0,255);
        stroke(0, 0, 255);
        ellipse(this.x, this.y, this.radius*2, this.radius*2);
        noStroke();
        textSize(20);

        if(this.ready_to_mate()){
            fill(55, 165, 0);
        }else{
            fill(0,0,0);
        }
        text(`${this.xp}`, this.x, this.y)

        if(this.isPredator){
            fill(50,205,50);
            stroke(0, 0, 255);
            ellipse(this.x, this.y, this.radius, this.radius);
            noStroke();
        }else if(this.mutant){
            fill(255,255,255);
            stroke(0, 0, 255);
            ellipse(this.x, this.y, this.radius, this.radius);
            noStroke();
        }

        let change_of_mutation = random(5);
        if(change_of_mutation === 0){
            this.mutate();
        }
    }

    ready_to_mate(){
        if(this.xp >= 70 && this.mates_remaining > 0){
            return true;
        }
    }

    mate(species1_arr){

        for(let i = 0; i < species1_arr.length; i ++){
            let target_x = species1_arr[i].x;
            let target_y = species1_arr[i].y;        

            if(this.ready_to_mate() && species1_array[i].ready_to_mate()){
                //check collision
                let distance = dist(this.x, this.y, target_x, target_y);

                if(distance < 50 && distance > 0){
                    console.log("in mating range")
                    this.mates_remaining --;
                    for(let kids = 0; kids <= this.numOffspring; kids++){
                        addSpecies1(this.mutationPasser, species1_arr[i].mutationPasser); // <-- pass in both parent's mutation attributes
                    }
                    this.xp -= 30;


                    
                }

                return true;
            }
        }
        return false;

    }


    }








class Species2 extends Species{

    constructor(parent1, parent2){
        
        super(parent1, parent2);

        this.mutationPasser = {
            'increaseOffspring' : 0,
            'decreaseOffspring' : 0,
            'increaseRadius' : 0,
            'decreaseRadius' : 0,
            'increaseSpeed' : 0, 
            'decreaseSpeed' : 0,
            'isPredator': 0,
        }

        this.info = {
            'Speed': this.speed,
            'XP': this.xp,
            'Mates Remaining': this.mates_remaining,
            'Number of Offspring': this.numOffspring,
            'Radius': this.radius,
            'Mutations': this.mutationPasser
        }


        this.mutate();

    }

    display(){
        fill(255,0,0);
        stroke(255, 0, 0);
        ellipse(this.x, this.y, this.radius*2, this.radius*2);
        noStroke();
        textSize(20);
        if(this.ready_to_mate()){
            fill(55, 165, 0);
        }else{
            fill(0,0,0);
        }
        text(`${this.xp}`, this.x, this.y)
        if(this.isPredator){
            fill(50,205,50);
            stroke(0, 0, 255);
            ellipse(this.x, this.y, this.radius, this.radius);
            noStroke();
        }else if(this.mutant){
            fill(255,255,255);
            stroke(0, 0, 255);
            ellipse(this.x, this.y, this.radius, this.radius);
            noStroke();
        }

        let change_of_mutation = random(5);
        if(change_of_mutation === 0){
            this.mutate();
        }
    }

    ready_to_mate(){
        if(this.xp >= 70 && this.mates_remaining > 0){
            return true;
        }
    }

    

    mate(species2_arr){

        for(let i = 0; i < species2_arr.length; i ++){
            let target_x = species2_arr[i].x;
            let target_y = species2_arr[i].y;        

            //this.uid !== target_uid && 
            if(this.ready_to_mate() && species2_arr[i].ready_to_mate()){
                //check collision
                let distance = dist(this.x, this.y, target_x, target_y);

                if(distance < 50 && distance > 0){
                    console.log("in mating range")
                    this.mates_remaining --;
                    for(let kids = 0; kids <= this.numOffspring; kids++){
                        //can add chance of survival here
                        addSpecies2(this.mutationPasser, species2_arr[i].mutationPasser); // <-- pass in both parent's mutation attributes
                    }

                    this.xp -= 30;

                    
                }

                return true;
            }
        }
        return false;

    }

    }


class Vegitation{

    
    constructor(){
        this.x = random(width);
        this.y = random(height);

        this.radius = 4;
    }

    display(){
        fill(0,0,0);
        stroke(0, 0, 255);
        ellipse(this.x, this.y, this.radius*2, this.radius*2);
        noStroke();
    }



}