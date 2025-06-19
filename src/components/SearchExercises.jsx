import { useEffect, useState } from "react"
import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import { exerciseOptions, fetchData } from "../utils/fetchData"
import HorizontalScrollbar from "./HorizontalScrollbar"

const SearchExercises = ({setExercises, bodyPart, setBodyPart}) => {
  let [search, setSearch] = useState('')  
  
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
        const bodyPartsData=await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
        console.log('Returned:', bodyPartsData);
        setBodyParts(['all', ...bodyPartsData]);
    }

    fetchExercisesData();
  },[]);
  

  const handleSearch=async()=>{
    if(search){
        const exercisesData=await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
        console.log(exercisesData);
        const searchedExercises=exercisesData.filter(
            (exercise) => exercise.name.toLowerCase().includes(search)
            || exercise.target.toLowerCase().includes(search)
            || exercise.equipment.toLowerCase().includes(search)
            || exercise.bodyPart.toLowerCase().includes(search)
        );

        setSearch('');
        setExercises(searchedExercises);

    }
  }
  console.log('Body Parts:', bodyParts);

  return (

    <Stack alignItems='center' mt='37px' justifyContent='center' p='20px'>

        <Typography fontWeight={700} sx={{fontSize:{lg:'44px', xs:'30px'}}} mb='50px' textAlign='center'>
            Exercises that actually work <br/> For real. 
        </Typography>

        <Box position='relative' mb='72px'>
            
            <TextField
            sx={{
                input: {
                    fontWeight: '700', 
                    border: 'none', 
                    borderRadius: '4px'},

                width: {
                    lg: '800px', 
                    xs: '350px'},
                    backgroundColor: '#fff', 
                    borderRadius: '40px'}}
                height='76px'
                value={search}
                onChange={(e) =>setSearch(e.target.value.toLowerCase())}
                placeholder='Search Exercises'
                type='text'
            />

            <Button className='search-btn'
            sx={{
            width: {lg: '175px', xs: '80px'}, 
            height: '49px', 
            position: 'absolute', right:'0',
            textTransform: 'none', 
            fontSize: {lg: '20px', xs: '14px'},
            backgroundColor: '#ff2625',
            color: '#fff', 
            
            '&:hover': {
            backgroundColor: '#fff',
            color: '#ff2625',
            border: '2px solid #ff2625',},
            }}
            onClick={handleSearch}>
                Search
            </Button>
        </Box>

        <Box sx={{
            position:'relative', width:'100%', p:'20px'}}>
                <HorizontalScrollbar data={bodyParts}
                bodyPart={bodyPart} setBodyPart={setBodyPart} isBodyParts/>
        </Box>
    </Stack>
  )
}

export default SearchExercises