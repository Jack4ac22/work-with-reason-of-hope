export default async function Page() {
  const question = {
    "id": 8,
    "category": "Multiple choice",
    "question": "What son did Eve say God gave her to replace Abel, whom Cain killed?",
    "question_ar": "ما الابن الذي قالت حواء أن الله أعطاها ليحل محل هابيل، الذي قتله قايين؟",
    "verses": ["Gen.4.25"],
    "tags": ["History", "People and Places"],
    "answers": [
      {
        "id": 1,
        "answer": "Seth",
        "answer_ar": "شيث",
        "isCorrect": true
      },
      {
        "id": 2,
        "answer": "Enoch",
        "answer_ar": "اينوك",
        "isCorrect": false
      },
      {
        "id": 3,
        "answer": "Enosh",
        "answer_ar": "إينوش",
        "isCorrect": false
      }
    ]
  }
  return (<>
    <section className="bg-gray-100 py-5">
      <form className="max-w-sm mx-auto">
        {/* id */}
        <div className="mb-5">
          <label for="id" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">id</label>
          <input type="text" id="id" className="text-left shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="quiz_id" required />
        </div>
        {/* question */}
        <div className="mb-5">
          <label for="question" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">question</label>
          <textarea type="text" id="question" className="text-left shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="question" required rows={5} />
        </div>
        {/* question_ar */}
        <div className="mb-5">
          <label for="question_ar" className="text-right block mb-2 text-sm font-medium text-gray-900 dark:text-white">question_ar</label>
          <textarea type="text" id="question_ar" className="text-right shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="question_ar" required rows={5} />
        </div>
        {/* category */}
        <div className="mb-5">
          <label for="category" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
          <select id="category" dir='ltr' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>Multiple choice</option>
            <option>True or false</option>
          </select>
        </div>
        {/* verses */}
        <div className="mb-5">
          <label for="verses" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">verses</label>
          <input type="text" id="verses" className="text-left shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="verses" required />
        </div>
        {/* tags */}
        <div className="mb-5">
          <label for="tags" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">tags</label>
          <input type="text" id="tags" className="text-left shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="tags" required />
        </div>
        {/* Answers if category is True or false */}
        {question.category === 'True or false' && (

          <>
            <fieldset >
              <legend className="sr-only">Answers</legend>

              <div className="flex items-center mb-4">
                <input id="answer-1" type="radio" name="countries" value={true} className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" checked />
                <label for="country-option-1" className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300">
                  True
                </label>
              </div>

              <div className="flex items-center mb-4">
                <input id="answer-2" type="radio" name="countries" value={false} className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                <label for="country-option-2" className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  False
                </label>
              </div>
            </fieldset>
          </>
        )}

        {/* Answers if category is Multiple choice */}
        {question.category === 'Multiple choice' && (
          <>
            {/* answer 1 */}
            <div className="mb-5" dir='ltr'>
              <label for="answer-1" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">answer 1</label>
              <input type="text" id="answer-1" className="text-left shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="answer 1" required />
              <input type="text" id="answer-1-ar" className="text-right shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="الإجابة الأولى" required dir='rtl' lang='ar' />

              <fieldset>
                <legend class="sr-only">Checkbox variants</legend>
                <div class="relative flex items-start">
                  <div class="flex items-center h-5">
                    <input id="answer-1-isCorrect" name="variants" type="checkbox" class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded dark:border-gray-600 dark:focus:ring-blue-500 dark:text-blue-500 dark:bg-gray-700" />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="answer-1-isCorrect" class="font-medium text-gray-700 dark:text-gray-300">Is correct</label>
                  </div>
                </div>
              </fieldset>
            </div>
            {/* answer 2 */}
            <div className="mb-5" dir='ltr'>
              <label for="answer-2" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">answer 2</label>
              <input type="text" id="answer-2" className="text-left shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="answer 2" required />
              <fieldset>
                <legend class="sr-only">Checkbox variants</legend>
                <div class="relative flex items-start">
                  <div class="flex items-center h-5">
                    <input id="variants" name="variants" type="checkbox" class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded dark:border-gray-600 dark:focus:ring-blue-500 dark:text-blue-500 dark:bg-gray-700" />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="variants" class="font-medium text-gray-700 dark:text-gray-300">Is correct</label>
                  </div>
                </div>
              </fieldset>
            </div>
            {/* answer 3 */}
            <div className="mb-5" dir='ltr'>
              <label for="answer-3" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">answer 3</label>
              <input type="text" id="answer-3" className="text-left shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="answer 3" required />
              <fieldset>
                <legend class="sr-only">Checkbox variants</legend>
                <div class="relative flex items-start">
                  <div class="flex items-center h-5">
                    <input id="variants" name="variants" type="checkbox" class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded dark:border-gray-600 dark:focus:ring-blue-500 dark:text-blue-500 dark:bg-gray-700" />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="variants" class="font-medium text-gray-700 dark:text-gray-300">Is correct</label>
                  </div>
                </div>
              </fieldset>
            </div>
          </>
        )}
        <div className="my-5" dir='ltr'>
          {/* Submit */}
          <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">save</button>
          {/* delete */}
          <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Cancel</button>
          {/* cancel */}
          <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">delete</button>
        </div>
      </form>
    </section>
  </>
  );
}