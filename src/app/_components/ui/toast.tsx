import { toast } from '@/components/ui/use-toast'

type Props = { title: string, description?: string, variant?: any, className?: string }

// const {toast} = useToast()
export default function Toast({ title, description, variant = "default", className }: Props) {
  toast({
    title,
    description,
    variant,
    className
  })
}
