import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();


export const workoutsReducer =(state,action)=>{
       switch(action.type){
              case 'SET_WORKOUTS':
                   return {
                    workouts: action.payload
                   }
              case 'CREATE_WORKOUT':
                   return {
                      workouts:[action.payload, ...state.workouts]
                   } 
               case 'DELETE_WORKOUT':
                    return {
                        workouts: state.workouts.filter(w => w._id !== action.payload._id)
                    }    
               default :
                   return state;        
       }
}


export const WorkoutsContextProvider = ({children}) => {
  const [state,dispatch] = useReducer(workoutsReducer,{workouts:null});

//   dispatch({type: 'SET_WORKOUTS', payload: {workouts: []}});

   return (
    <WorkoutContext.Provider value={{...state,dispatch}}>
        {children}
    </WorkoutContext.Provider>
   )

}

//we created this custom workoutscontextprovider to wrap our app component in the index.js file
//which returns the workoutcontext provider with the children prop

//since workoutscontextprovider is wrapped around the app component, we can now access the workoutcontext



