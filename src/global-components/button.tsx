import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const ButtonVariants = tv({
  base: 'flex items-center justify-center gap-2 px-5 font-medium rounded-lg',
  variants: {
    variant: {
      primary: 'bg-lime-300 text-lime-950 hover:bg-lime-400',
      secondary: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
    },
    size: {
      default: 'py-2',
      full: 'w-full h-11'
    }
  },

  defaultVariants: {
    variant: 'primary',
    size: 'default'
  }
})

//estendemos todas as propriedades de um botao com o ComponentProps e variantes com ButtonVariants
interface GlobalButtonProps extends ComponentProps<'button'>, VariantProps<typeof ButtonVariants>{
  // ReactNode Permite que passamos qualquer coisa para o componente em outras paginas
  children: ReactNode
}

//E com o spread operator (...) passamos todos os props pro botão
export function GlobalButton({ children, variant, size, ...props }: GlobalButtonProps) {
  return (
    <button
      {...props}
      className={ButtonVariants({ variant, size })}
    >
      {children}
    </button>
  )
}