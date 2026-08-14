import content from './content.json'

const { header, publications, courses } = content

function PublicationCard({ pub }) {
  const image = <img src={pub.image} alt="" />
  return (
    <div className="flex flex-col items-center bg-white p-2 rounded">
      {pub.imageLinked ? (
        <a href={pub.href} target="_blank" rel="noopener noreferrer" className="text-link hover:text-hover">
          {image}
        </a>
      ) : (
        image
      )}
      <div className="w-full text-left text-lg font-bold mb-1" style={{ fontFamily: 'Oswald' }}>
        <a href={pub.href} target="_blank" rel="noopener noreferrer" className="text-link hover:text-hover">
          {pub.title}
        </a>
      </div>
      <div className="text-sm mb-3 text-left">{pub.description}</div>
      <div
        className="w-full text-left text-sm italic mb-1 mt-auto border border-gray-400 rounded-md p-2"
        style={{ fontFamily: 'Oswald' }}
      >
        {pub.venue}
      </div>
    </div>
  )
}

function CourseCard({ course }) {
  return (
    <div className="flex flex-col items-center bg-white p-2 rounded">
      <img src={course.gif} alt="Animated GIF" className="w-64 h-auto rounded" />
      <div className="w-full text-left text-lg font-bold mb-1" style={{ fontFamily: 'Oswald' }}>
        <a href={course.href} target="_blank" rel="noopener noreferrer" className="text-link hover:text-hover">
          {course.title}
        </a>
      </div>
      <div className="text-sm text-left">{course.description}</div>
    </div>
  )
}

export default function App() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex gap-4 items-start">
        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="text-5xl font-bold font-inter text-left mb-2">{header.name}</h1>
            <div className="text-lg text-left font-main leading-none">{header.title}</div>
            <div className="text-lg text-left font-main leading-tight">{header.institution}</div>
            <div className="text-sm text-left font-main leading-tight">
              {header.socialLinks.map((link, i) => (
                <span key={link.href}>
                  {i > 0 && ' | '}
                  <a href={link.href} className="text-link hover:text-hover" target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </span>
              ))}
            </div>
          </div>

          <div className="flex-1 p-4 font-main bg-[#ffcc00] rounded">
            <div className="text-2xl font-semibold font-inter mb-2">RECENT WORK</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {publications.map((pub) => (
                <PublicationCard key={pub.href} pub={pub} />
              ))}
            </div>
          </div>

          <div className="flex-1 p-4 font-main bg-[#5cdfe5] rounded">
            <div className="text-2xl font-semibold font-inter mb-2">TEACHING</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {courses.map((course) => (
                <CourseCard key={course.href} course={course} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
