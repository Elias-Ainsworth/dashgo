import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useQuery } from '@tanstack/react-query'

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function Userlist() {
  const { data, isLoading, error } = useQuery(['users'], async () => {
    const response = await fetch('http://localhost:3000/api/users')
    const data = await response.json()
    const users = data.users.map(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString()
      }
    })
  });

  console.log(useQuery);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
})

return (
  <Box>
    <Header />
    <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
      <Sidebar />

      <Box flex="1" borderRadius={8} bg="gray.800" p="8">
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal">Listagem de usuários</Heading>
          <Link href="/users/create" passHref>
            <Button 
              as="a" 
              size="sm" 
              fontSize="sm" 
              colorScheme="pink"
              leftIcon={<Icon as={RiAddLine} fontSize="20"/>}
            >
              Criar novo
            </Button>
          </Link>
        </Flex>

       { isLoading ? (
        <Flex justify="center">
          <Spinner />
        </Flex>
       ) : error ? (
        <Flex justify="center">
          <Text>Falha ao obter dados dos usuários.</Text>
        </Flex>
       ) : (
        <>
        <Table colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th px={["4", "4", "6"]} color="gray.300" width="8">
              <Checkbox colorScheme="pink" />
            </Th>
            <Th>Usuário</Th>
            { isWideVersion && <Th>Data de cadastro</Th> }
            <Th width="8"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(user => {
            return (
              <Tr key={user.id}>
              <Td px={["4", "4", "6"]}>
               <Checkbox colorScheme="pink" />
               </Td>
               <Td>
                 <Box>
                   <Text fontWeight="bold">{user.name}</Text>
                   <Text fontSize="small" color="gray.300">{user.email}</Text>
                 </Box>
               </Td>
               { isWideVersion && <Td>{user.created}</Td> }
             </Tr> 
            )
          })}
        </Tbody>
      </Table>

      <Pagination />
      </>
       ) }
      </Box>
    </Flex>
  </Box>
);
}