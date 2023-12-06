
export default function ContentSectionBody(props: {
    contentSection: 'images' | 'files'
}){
    return (
        <div className={'content-section-body'}>
            {
                props.contentSection === 'images' ? (
                    <h2>Kuvat</h2>
                )
                :
                <h2>Tiedostot</h2>
            }
        </div>
    )
}