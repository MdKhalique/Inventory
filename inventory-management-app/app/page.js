'use client'

import { useState, useEffect } from 'react'
import { Box, Stack ,Grid, Typography, Button, Modal, TextField, Card, CardContent, CardMedia, CardActions } from '@mui/material'
import { styled } from '@mui/system'
import { firestore } from '@/firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.15s ease-in-out',
  '&:hover': { transform: 'scale(1.03)' },
}))

const StyledCardMedia = styled(CardMedia)({
  paddingTop: '56.25%', // 16:9 aspect ratio
})


const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
})



export default function Home() {

  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const [searchQuery, setSearchQuery] = useState("")
  const [imageUrl, setImageUrl] = useState('')

  const searchInventory = async (searchQuery) => {
    const snapshot = await getDocs(collection(firestore, 'inventory'))
    const inventoryList = []
    snapshot.forEach((doc) => {
      const item = { name: doc.id, ...doc.data() }
      if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        inventoryList.push(item)
      }
    })
    setInventory(inventoryList)
  }
  
  const updateInventory = async () => {
    if (searchQuery) {
      await searchInventory(searchQuery)
    } else {
      const snapshot = query(collection(firestore, 'inventory'))
      const docs = await getDocs(snapshot)
      const inventoryList = []
      docs.forEach((doc) => {
        inventoryList.push({ name: doc.id, ...doc.data() })
      })
      setInventory(inventoryList)
    }
    console.log(inventory)
  }
 /*const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
    console.log(inventoryList)
  }*/

  
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updateInventory()
  }



  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1, imageUrl })
    } else {
      await setDoc(docRef, { quantity: 1, imageUrl })
    }
    await updateInventory()
    setImageUrl('')
  }

 /* const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    } else {
      await setDoc(docRef, { quantity: 1 })
    }
    await updateInventory()
  }


  useEffect(() => {
    updateInventory()
  }, [searchQuery])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
     </Modal>
      
     <Stack direction="row" spacing={2} width="800px" marginBottom={2}>
        <TextField
          fullWidth
          label="Search items"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="contained" onClick={() => searchInventory(searchQuery)}>
          Search
        </Button>
      </Stack>
    

      <Button variant="contained" onClick={handleOpen}>
        Add New Item 
      </Button>
      
      <Box border={'1px solid #333'}>
        <Box
          width="800px"
          height="100px"
          bgcolor={'#ADD8E6'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
            Inventory Items
          </Typography>
        </Box>
        <Stack width="800px" height="300px" spacing={2} overflow={'auto'}>
          {inventory.map(({name, quantity}) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              bgcolor={'#f0f0f0'}
              paddingX={5}
            >
              <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
                Quantity: {quantity}
              </Typography>
              <Stack direction={"row"} spacing={2}>
                <Button variant="contained" onClick={() => removeItem(name)}>
                  Remove
                </Button>
                <Button variant="contained" onClick={() => addItem(name)}>
                  Add
                </Button>
              </Stack>

            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
  */

const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

return (
  <Box sx={{ padding: 4 }}>
    <Typography variant="h3" gutterBottom>Inventory Management</Typography>
    
    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
      <Grid item xs={12} sm={8}>
        <TextField
          fullWidth
          label="Search items"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <Button fullWidth variant="contained" onClick={() => searchInventory(searchQuery)}>
          Search
        </Button>
      </Grid>
      <Grid item xs={12} sm={2}>
        <Button fullWidth variant="contained" onClick={handleOpen}>
          Add New Item
        </Button>
      </Grid>
    </Grid>

    <Grid container spacing={3}>
      {inventory.map(({name, quantity, imageUrl}) => (
        <Grid item key={name} xs={12} sm={6} md={4}>
          <StyledCard>
            <StyledCardMedia
              image={imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
              title={name}
            />
            <StyledCardContent>
              <Typography variant="h5" component="h2">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Quantity: {quantity}
              </Typography>
            </StyledCardContent>
            <CardActions>
              <Button size="small" color="primary" onClick={() => removeItem(name)}>
                Remove
              </Button>
              <Button size="small" color="primary" onClick={() => addItem(name)}>
                Add
              </Button>
            </CardActions>
          </StyledCard>
        </Grid>
      ))}
    </Grid>

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
          Add Item
        </Typography>
        <TextField
          fullWidth
          label="Item Name"
          variant="outlined"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Image URL"
          variant="outlined"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            addItem(itemName)
            setItemName('')
            handleClose()
          }}
        >
          Add
        </Button>
      </Box>
    </Modal>
  </Box>
)
}