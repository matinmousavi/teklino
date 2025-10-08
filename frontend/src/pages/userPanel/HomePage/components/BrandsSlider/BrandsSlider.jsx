import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

import { brands } from '../../../../../data/mockBrands'
import styles from './BrandsSlider.module.css'

const BrandsSlider = () => {
	return (
		<section className={styles['brands-slider']}>
			<h2 className={styles['brands-slider__title']}>
				محبوب‌ترین برندها
			</h2>
			<Swiper
				modules={[Autoplay]}
				spaceBetween={50}
				slidesPerView={5}
				loop={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				breakpoints={{
					320: { slidesPerView: 2, spaceBetween: 20 },
					640: { slidesPerView: 3, spaceBetween: 30 },
					768: { slidesPerView: 4, spaceBetween: 40 },
					1024: { slidesPerView: 5, spaceBetween: 50 },
				}}
			>
				{brands.map(brand => (
					<SwiperSlide
						key={brand.id}
						className={styles['brands-slider__slide']}
					>
						<img
							src={brand.logo}
							alt={brand.name}
							className={styles['brands-slider__logo']}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	)
}

export default BrandsSlider
