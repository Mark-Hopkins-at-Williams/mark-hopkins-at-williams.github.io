const publications = [
  {
    href: 'https://aclanthology.org/2025.wmt-1.14.pdf',
    image: 'images/wmt2025_prevue.png',
    imageLinked: true,
    title:
      'Using Encipherment to Isolate Conditions for the Successful Fine-tuning of Massively Multilingual Translation Models',
    description:
      'When fine-tuning massively multilingual translation models for low-resource languages, practitioners often include auxiliary languages to improve performance, but factors determining successful auxiliary language selection remain unclear. This paper investigated whether syntactic similarity or lexical overlap is more important for effective multilingual fine-tuning.',
    venue: 'Published in the Proceedings of the 10th Conference on Machine Translation (WMT).',
  },
  {
    href: 'https://aclanthology.org/2023.acl-long.437/',
    image: 'images/selective.png',
    imageLinked: true,
    title:
      'On the Evaluation of Neural Selective Prediction Methods for Natural Language Processing',
    description:
      'This work provides a methodological blueprint for evaluating neural selective classification methods, including a novel metric called refinement that provides a calibrated evaluation of confidence functions for selective prediction.',
    venue:
      'Published in the Proceedings of the 61st Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers).',
  },
  {
    href: 'https://aclanthology.org/2022.conll-1.7/',
    image: 'images/research2.png',
    imageLinked: false,
    title: 'Towards More Natural Artificial Languages',
    description:
      'Artificial languages have the potential to enable the targeted study of how typological properties of language impact model performance. This work sought to enhance the realism of artificial languages by developing a generation method that supports selectional preference.',
    venue:
      'Published in the Proceedings of the 26th Conference on Computational Natural Language Learning (CoNLL).',
  },
  {
    href: 'https://www.liebertpub.com/doi/abs/10.1089/cmb.2022.0132',
    image: 'images/research1.png',
    imageLinked: true,
    title: 'Transformer Neural Networks for Protein Family and Interaction Prediction Tasks',
    description:
      'A collaboration with Reed College and the University of Illinois at Urbana-Champaign, this work adapted natural language processing techniques to the automatic identification of protein families.',
    venue: 'Published in the Journal of Computational Biology.',
  },
]

const courses = [
  {
    href: 'https://mark-hopkins-at-williams.github.io/csci-134/',
    gif: 'https://media.giphy.com/media/xhxwhoWHtGKGNDwn1y/giphy.gif',
    title: 'CSCI 134: Introduction to Computer Science',
    description:
      'This course introduces students to the science of computation by exploring the representation and manipulation of data and algorithms. We organize and transform information in order to solve problems using algorithms written in a modern object-oriented language. Topics include organization of data using objects and classes, and the description of processes using conditional control, iteration, methods and classes. We also begin the study of abstraction, self-reference, reuse, and performance analysis. While the choice of programming language and application area will vary in different offerings, the skills students develop will transfer equally well to more advanced study in many areas. In particular, this course is designed to provide the programming skills needed for further study in computer science and is expected to satisfy introductory programming requirements in other departments.',
  },
  {
    href: 'https://mark-hopkins-at-williams.github.io/csci-270/',
    gif: 'https://media.giphy.com/media/PFVOx7eDfBT3a6Gw9S/giphy.gif',
    title: 'CSCI 270: Foundations of Artificial Intelligence',
    description:
      'Computer science has increasingly set its sights on problems with no obvious prescriptive solution, such as image classification, natural language understanding, and game playing. As it is infeasible to prescriptively identify a cat from a set of pixels, or a winning move from the state of a chess board, tools from the traditional computer science canon of algorithms and system building are often insufficient. Artificial intelligence (AI) techniques have increasingly been leveraged to fill this gap. Rather than explicitly specifying how to solve a task, AI techniques typically take an indirect approach: first describing the task using a standardized representation (e.g., labeled data for supervised machine learning and state spaces for heuristic search), and then employing general-purpose algorithms that operate on the task description. The goal of this course is to introduce the theoretical and practical foundations that will enable students to add AI methodologies to their computational toolbox. It provides the fundamentals for more advanced study of artificial intelligence and machine learning.',
  },
]

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
            <h1 className="text-5xl font-bold font-inter text-left mb-2">MARK HOPKINS</h1>
            <div className="text-lg text-left font-main leading-none">ASSOCIATE PROFESSOR OF COMPUTER SCIENCE</div>
            <div className="text-lg text-left font-main leading-tight">WILLIAMS COLLEGE</div>
            <div className="text-sm text-left font-main leading-tight">
              <a
                href="https://github.com/Mark-Hopkins-at-Williams"
                className="text-link hover:text-hover"
                target="_blank"
                rel="noopener noreferrer"
              >
                GITHUB
              </a>{' '}
              |{' '}
              <a
                href="https://scholar.google.com/citations?user=gGqR-CEAAAAJ&hl=en"
                className="text-link hover:text-hover"
                target="_blank"
                rel="noopener noreferrer"
              >
                GOOGLE SCHOLAR
              </a>{' '}
              |{' '}
              <a
                href="https://www.linkedin.com/in/mark-hopkins-7163204/"
                className="text-link hover:text-hover"
                target="_blank"
                rel="noopener noreferrer"
              >
                LINKEDIN
              </a>
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
