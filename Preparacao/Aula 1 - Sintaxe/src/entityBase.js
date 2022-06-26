class Entitybase {
    #age
    #gender
    #name
    constructor({ age, name, gender }) {
        this.#age = age
        this.#name = name
        this.#gender = gender
    }

    get birthYear(){
        if(!this.#age) throw new Error('Age not found!')
        return new Date().getFullYear - parseInt(this.#age)
    }

    get name(){
        if(!this.#gender) throw new Error('Gender not found!')
        const preffix = this.#gender === "male" ? "Mr." : "Ms."
        return `${preffix} ${this.#name}`
    }

    set age(value){
        this.#age = value
    }
}

module.exports = Entitybase