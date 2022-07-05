import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar"
import { Input } from "../../components/Form/Input"
import Link from "next/link";
import { useMutation } from "react-query"
import { api } from "../../services/api"
import { queryClient } from '../../services/queryClient'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from "next/router";

type CreateUserFormData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório.'),
  email: yup.string().required('E-mail Obrigatório.').email('E-mail inválido.'),
  password: yup.string().required('Senha obrigatória.').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf(
    [ null, yup.ref('password') ],
    'As senhas precisam ser iguais'
  ),
})

export default function CreateUser () {
  const {push} = useRouter()
  
  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date()
      }
    })

    return response.data.user
  }, {
    onSuccess() {
      queryClient.invalidateQueries('users')
    },
  })
  
  const { register, handleSubmit, formState } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema)
  })
  const {errors} = formState

  const handleCreateUser = handleSubmit(async (values) => {
    await createUser.mutateAsync(values)
    push('/users')
  })

  return (
    <Box>
      <Header />

      <Flex
        w="100%"
        my="6"
        maxW="1480"
        mx="auto"
        px="6"
      >
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}>
          <Heading size="lg" fontWeight="normal"> Criar usuário </Heading>

          <Divider my="6" borderColor="gray.700" />

          <Box as="form" onSubmit={handleCreateUser}>
            <VStack spacing={["6", "8"]}>
              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <Input label="Nome completo" {...register('name')} error={errors.name} />
                <Input type="email" label="E-mail" {...register('email')} error={errors.email} />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <Input type="password" label="Senha" {...register('password')} error={errors.password} />
                <Input type="password" label="Confirmação da senha" {...register('password_confirmation')} error={errors.password_confirmation} />
              </SimpleGrid>
            </VStack>

            <Flex mt="8" justify="flex-end">
              <HStack spacing="4">
                <Link href="/users" passHref>
                  <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                </Link>
                <Button
                  type="submit"
                  // isLoading={formState.isSubmitting}
                  colorScheme="pink"
                >
                  Salvar
                </Button>
              </HStack>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}