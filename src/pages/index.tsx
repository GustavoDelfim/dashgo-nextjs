import { Flex, Stack, Button } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../components/Form/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

type SignInFormData = {
  email: string
  password: string
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail Obrigatório.').email('E-mail inválido.'),
  password: yup.string().required('Senha obrigatória')
})

export default function SignIn () {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })
  const {errors} = formState
  
  const handleSignIn = handleSubmit<SignInFormData>(async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2500))
    console.log(values)
  })
  
  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        padding={8}
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSignIn}
      >
        <Stack spacing={4}>
          <Input
            type="email"
            name="email"
            label="E-mail"
            {...register('email')}
            error={errors.email}
          />
          <Input
            type="password"
            name="password"
            label="Password"
            {...register('password')}
            error={errors.password}
          />
        </Stack>

        <Button
          type="submit"
          mt={6}
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
