// Adding deep clone  method to global class Object  
// Function get one argument type of === object

Object.prototype.deepCloneDev = function(){
	const setObj = this;

	if(Object.keys(setObj).length === 0 || typeof setObj !== 'object') return console.error('The argument you specified is not an object or cannot be cloned');

	let pull = {};
	let collection = {}
	let i = 0
	
	const clone = deepClone(setObj)

	// return the result
	return clone

	function has(setPull,obj){
		let flag = false;
		Object.keys(setPull).forEach((el)=>{
			if(setPull[el].key === obj){
				flag = true
			}

		})
		return flag
	}
	function get(setPull,obj){
		let item = false;
		Object.keys(setPull).forEach((el)=>{
			if(setPull[el].key === obj){
				item = setPull[el].value
			}

		})
		return item
	}
	function set(setPull,obj,clone){
		let flag = null	

		Object.keys(pull).forEach((el)=>{
				if(pull[el].key === obj){
					flag = el
				}
			})
			collection = Object.assign({},{
				key:obj,
				value:clone
			})
			if(flag === null){
				pull[i] = collection

			}else{
				pull[flag] = collection
			}
	}
	function deepClone(obj){
		// If the argument is not an object return obj
		if(typeof obj !== 'object' || obj === null) return obj;

		// Check what our object is

		// If is an array we returned array
		if(Array.isArray(obj)){
			// Create a empty array that will be the first level of our cloning
			const clone = []
			set(pull,obj,clone)
			i++
			// Creating a cycle will give all the keys of our array
			obj.forEach((elm,i)=>{

				// If our array item has in collection we clone it
				if(has(pull,obj[i])){
					clone.push(get(pull,obj[i]) )
				}
				// If our array item has not in collection 
				// We do recursion by calling deepClone function as an argument of this array item 
				else{
					clone.push(deepClone(obj[i]))

				}
			})
			// return result
			return clone;
		}
		// If is an object we returned object
		else{

			// Create a empty object that will be the first level of our cloning
			const clone = {}

			let desc = Object.getOwnPropertyDescriptors(obj)
			// Create a collection whith key is cloning obj and value is clone

			set(pull,obj,clone)
			i++

			// Creating a cycle will give all the keys of our object
			for(const key in desc){
					
				// If our object key has in collection we clone it
				if(has(pull,obj[key])){
					Object.defineProperty(clone, key, desc[key])
					clone[key] = get(pull,obj[key]) 
				}
				// If our object key has not in collection 
				// We do recursion by calling deepClone function as an argument of this object key 
				else{
					Object.defineProperty(clone, key, desc[key])
				 	clone[key] = deepClone(obj[key])
				}
			}
			// return result
			return clone;
		}
	}

}

Object.defineProperty(Object.prototype, 'deepCloneDev', {
	enumerable :false,
})



// You can see the result in the console

// Example in Object
const tmpObj = {
		
		val1:'a',
		val2:{
			val21:'b',
			val22:1,
			val23:{
				val231:'c',
				val232:'a'
			}
		},
		val3:{
			val31:{
				val311:'obj3',
				val312:{
					val3121:'obj4'
				}
			}
		},
		val4:()=>{
			return 'func'
		},
		val5:[{Arr1:1},2]
	}
tmpObj.self = tmpObj
Object.defineProperty(tmpObj, 'val2', {
	enumerable :false,
})

let list = Object.create(Object.prototype,{
    Leo: {
        value: "Leo",
        configurable: false,
        writable: false,
        enumerable: true
    },
    Jack: {
        value: "Jack",
        configurable: false,
        writable: false,
        enumerable: true
    },
    length: {
      value: 2,
      configurable: false,
      writable: false,
      enumerable: false
    }
})


// Example in Array 
const tmpArr = [{
    id: 0,
    ref: null,
},
{
    id: 1,
    ref: null,
    arr: [{
	    id: 0,
	    ref: null,
		},
		{
		    id: 1,
		    ref: null,
		}],
}]
tmpArr[0].ref = tmpArr[1]
tmpArr[1].ref = tmpArr[0]

let resultArr = tmpArr.deepCloneDev()	
let resultObj = tmpObj.deepCloneDev()	
let resultProp = list.deepCloneDev()

console.group('Array')

console.log('start',tmpArr)
console.log('result',resultArr)
console.log('start === result',resultArr === tmpArr)
console.log('start[0].ref === result.self[0].ref',resultArr[0].ref === tmpArr[0].ref)

console.groupEnd()

console.group('Object')

console.log('start',tmpObj)
console.log('result',resultObj)
console.log('start === result',resultObj === tmpObj)
console.log('start.self === result.self',resultObj.self === tmpObj.self)

console.groupEnd()

console.group('Props')

console.log('start',list)
console.log('result',resultProp)
console.log('start prop',Object.getOwnPropertyDescriptors(list))
console.log('result prop',Object.getOwnPropertyDescriptors(resultProp))
console.log('start === result',list === resultProp)

console.groupEnd()
