'use client'
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";


export default function ToStackModal({isOpen, onClose}){

    const toast = useToast()


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Bloquer une somme</ModalHeader>
          <ModalCloseButton />
          <ModalBody> 
            Entrer la quantité que vous souhaitez bloquer. 
            <Input mt={3} type="number" name="toBlock"></Input>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Fermer
            </Button>
            <Button variant='ghost' loadingText='En cours' onClick={()=>{
                const examplePromise = new Promise((resolve, reject) => {
                    setTimeout(()=> resolve(200), 5000)
                })

                toast.promise(examplePromise, {
                    success: { title: 'Transaction effectuée !', description: 'La somme a bien été bloqué' },
                    error: { title: 'Erreur lors de la transaction', description: "La somme n'a pas pu etre bloqué, veuillez réessayé" },
                    loading: { title: 'Transaction en cours', description: 'Le transaction est en cours, cela prend generalement du temps' },
                  })
            }} >
                Valider
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}