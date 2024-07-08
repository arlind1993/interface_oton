import { forwardRef } from 'react'
import { DirectToDefi } from './sections/DirectToDefi'
import { Footer } from './sections/Footer'
import { NewsletterEtc } from './sections/NewsletterEtc'
import { Presale } from './sections/Presale'
// import { Stats } from './sections/Stats'

const Fold = forwardRef<HTMLDivElement>(function Fold(props, scrollAnchor) {
  return (
    <>
      
      <div ref={scrollAnchor}>
        <Presale/>
        <DirectToDefi />
      </div>
      {/* <Stats /> */}
      <NewsletterEtc />
      <Footer />
    </>
  )
})

export default Fold
