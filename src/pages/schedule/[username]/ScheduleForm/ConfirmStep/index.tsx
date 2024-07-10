import React from 'react'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { api } from '@/lib/axios'

// import { Container } from './styles';

const confirmFormSchema = z.object({
  name: z.string().min(3, {
    message: 'O nome precisa de no mínimo 3 caracteres.',
  }),
  email: z.string().email('Digite um e-mail válido'),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

const ConfirmStep: React.FC<ConfirmStepProps> = ({
  schedulingDate,
  onCancelConfirmation,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  const router = useRouter()
  const username = String(router.query.username)

  const describeDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describeTime = dayjs(schedulingDate).format('HH:mm[h]')

  async function handleConfirmScheduling(data: ConfirmFormData) {
    const { name, email, observations } = data
    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observations,
      date: schedulingDate,
    })

    onCancelConfirmation()
  }

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describeDate}
        </Text>
        <Text>
          <Clock />
          {describeTime}
        </Text>
      </FormHeader>
      <label>
        <Text size={'sm'}>Nome Completo</Text>
        <TextInput
          placeholder="Seu nome"
          crossOrigin={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          {...register('name')}
        />
        {errors.name && (
          <FormError size={'sm'}>{errors.name.message}</FormError>
        )}
      </label>
      <label>
        <Text size={'sm'}>Endereço de e-mail</Text>
        <TextInput
          type="email"
          placeholder="Seu nome"
          crossOrigin={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          {...register('email')}
        />
        {errors.email && (
          <FormError size={'sm'}>{errors.email.message}</FormError>
        )}
      </label>
      <label>
        <Text size={'sm'}>Observações</Text>
        <TextArea {...register('observations')} />
      </label>

      <FormActions>
        <Button
          type="button"
          variant={'tertiary'}
          onClick={onCancelConfirmation}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}

export default ConfirmStep
