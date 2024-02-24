import React from 'react'

export function InputDropzoneImageDish() {
	return (
		<div className={'flex flex-col gap-4'}>
			<div className={'flex flex-col gap-2'}>
				<h2>Image de présentation du plat</h2>
				<p>
					Vous pouvez présenter une image de votre plat, elle permettra à vos
					clients de se trouver plus simplement dans les choix qui lui sont
					proposés
				</p>
			</div>
			<div className="flex w-full items-center justify-center rounded-md border border-cyan-900/50 bg-cyan-900/10 p-4">
				<label
					htmlFor="dropzone-file"
					className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 "
				>
					<div className="flex flex-col items-center justify-center pb-6 pt-5">
						<svg
							className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 16"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
							/>
						</svg>
						<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
							<span className="font-semibold">Cliquez</span> ou glissez-déposez
							une image ici.
						</p>
						<p className="text-xs text-gray-500 dark:text-gray-400">
							PNG, JPG, WEBP jusqu&apos;à 1MB
						</p>
					</div>
					<input id="dropzone-file" type="file" className="hidden" />
				</label>
			</div>
		</div>
	)
}
